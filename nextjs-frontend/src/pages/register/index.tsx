import Action from "components/Action";
import AppContainer from "components/AppContainer";
import ClientForm from "components/ClientForm";
import TextInput from "components/TextInput";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Footer from "sections/Footer";
import ClientService, { ClientRegisterRequest } from "services/ClientService";
import { useForm } from "react-hook-form";
import MessageBox from "components/MessageBox";
import Message from "components/MessageBox/Message";
import { UnavailableEmail } from "services/apiErrors";
import { GetServerSideProps } from "next";
import LoadingButton from "components/LoadingButton";
import AuthHeader from "sections/AuthHeader";
import { ClientSessionContext } from "context/ClientSessionProvider";
import LoadingSplashScreen from "components/LoadingSplashScreen";
import { useRouter } from "next/dist/client/router";

const requiredRule = {
  required: {
    value: true,
    message: "Por favor completa este campo",
  },
};

const emailRule = {
  ...requiredRule,
  pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
};

const phoneRule = {
  ...requiredRule,
  pattern: { value: /^[0-9]+$/i, message: "Teléfono inválido" },
};

const DEFAULT_REDIRECT = "/";
interface RegisterPageProps {
  redirectTo?: string;
}

function RegisterPage({ redirectTo = DEFAULT_REDIRECT }: RegisterPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onBlur" });
  const [unavailableEmail, setUnavailableEmail] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const { isLoggedIn, login } = useContext(ClientSessionContext);
  const router = useRouter();
  const onSubmit = async (data: ClientRegisterRequest) => {
    try {
      setSigningUp(true);
      await ClientService.register(data);
      setUnavailableEmail(false);
      setUnexpectedError(false);
      await login(data);
      router.push(redirectTo);
    } catch (err) {
      if (err instanceof UnavailableEmail) {
        setUnavailableEmail(true);
      } else {
        setUnexpectedError(true);
      }
    }
    setSigningUp(false);
  };

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  if (isLoggedIn === undefined || isLoggedIn) return <LoadingSplashScreen />;

  return (
    <>
      <AuthHeader />
      <AppContainer className="h-[calc(100vh-80px)] flex flex-col items-center">
        <div className="m-auto w-full">
          <ClientForm
            title="Registrarse"
            className="mx-auto"
            form={{ onSubmit: handleSubmit(onSubmit) }}
          >
            <MessageBox className="mb-4">
              <Message show={unexpectedError}>
                ¡ Lo sentimos ! Ocurrió un error, por favor volvelo a intentar
                más tarde
              </Message>
            </MessageBox>

            <TextInput
              {...register("name", requiredRule)}
              label="Nombre"
              error={errors?.name?.message}
            />
            <TextInput
              {...register("email", emailRule)}
              label="Email"
              error={
                errors?.email?.message ||
                (unavailableEmail && "Este email ya existe")
              }
              className="mt-4"
            />
            <TextInput
              {...register("password", requiredRule)}
              label="Contraseña"
              type="password"
              error={errors?.password?.message}
              className="mt-4"
            />
            <div className="flex mt-4">
              <TextInput
                {...register("phone", phoneRule)}
                label="Teléfono"
                error={errors?.phone?.message}
                className="mr-4"
              />
              <TextInput
                {...register("address", requiredRule)}
                label="Dirección"
                error={errors?.address?.message}
              />
            </div>
            <LoadingButton
              style="primary"
              className="mt-4"
              type="submit"
              loading={signingUp}
            >
              Regitrarse
            </LoadingButton>
          </ClientForm>

          <p className="mx-auto text-center pt-4">
            ¿ Ya tenes una cuenta ?{" "}
            <Link
              href={`/login?redirectUrl=${redirectTo}`}
              as="/login"
              passHref
            >
              <Action className="text-primary font-medium">Ingresa</Action>
            </Link>
          </p>
        </div>

        <Footer className="mt-auto w-full" />
      </AppContainer>
    </>
  );
}
export default RegisterPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.redirectUrl) {
    return { props: { redirectTo: query.redirectUrl } };
  }
  return { props: {} };
};
