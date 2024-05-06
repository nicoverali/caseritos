import Action from "components/Action";
import AppContainer from "components/AppContainer";
import ClientForm from "components/ClientForm";
import TextInput from "components/TextInput";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Footer from "sections/Footer";
import { useForm } from "react-hook-form";
import { ClientSessionContext } from "context/ClientSessionProvider";
import { Credentials } from "services/SessionService";
import MessageBox from "components/MessageBox";
import Message from "components/MessageBox/Message";
import { UnauthorizedError } from "services/apiErrors";
import { useRouter } from "next/dist/client/router";
import { GetServerSideProps } from "next";
import LoadingButton from "components/LoadingButton";
import AuthHeader from "sections/AuthHeader";
import LoadingSplashScreen from "components/LoadingSplashScreen";

const requiredRule = {
  value: true,
  message: "Por favor completa este campo",
};

const emailPatternRule = {
  value: /^\S+@\S+$/i,
  message: "Email invalido",
};

const DEFAULT_REDIRECT = "/";

interface LoginPageProps {
  redirectTo?: string;
}

function LoginPage({ redirectTo = DEFAULT_REDIRECT }: LoginPageProps) {
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [credentialsInvalid, setCredentialsInvalid] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const { isLoggedIn, login } = useContext(ClientSessionContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onBlur" });

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  const onSubmit = async (data: Credentials) => {
    try {
      setCredentialsInvalid(false);
      setUnexpectedError(false);
      setLoggingIn(true);
      await login(data);
      router.push(redirectTo);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        setCredentialsInvalid(true);
      } else {
        setUnexpectedError(true);
      }
    }
    setLoggingIn(false);
  };

  if (isLoggedIn === undefined || isLoggedIn) return <LoadingSplashScreen />;

  return (
    <>
      <AuthHeader />
      <AppContainer className="h-[calc(100vh-80px)] flex flex-col items-center">
        <div className="m-auto w-full">
          <ClientForm
            title="Ingresar"
            className="mx-auto"
            form={{ onSubmit: handleSubmit(onSubmit) }}
          >
            <MessageBox className="mb-4">
              <Message show={credentialsInvalid}>
                Email o contraseña incorrectos
              </Message>
              <Message show={unexpectedError}>
                ¡ Lo sentimos ! Ocurrió un error, por favor volvelo a intentar
                más tarde
              </Message>
            </MessageBox>

            <TextInput
              {...register("email", {
                required: requiredRule,
                pattern: emailPatternRule,
              })}
              label="Email"
              error={errors?.email?.message}
            />
            <TextInput
              {...register("password", { required: requiredRule })}
              type="password"
              label="Contraseña"
              className="mt-4"
              error={errors?.password?.message}
            />
            <LoadingButton
              type="submit"
              style="primary"
              className="mt-4 transition-all"
              loading={loggingIn}
            >
              Ingresar
            </LoadingButton>
          </ClientForm>
          <p className="mx-auto text-center pt-4">
            ¿ No tenes una cuenta ?{" "}
            <Link
              href={`/register?redirectUrl=${redirectTo}`}
              as={"/register"}
              passHref
            >
              <Action className="text-primary font-medium">Registrate</Action>
            </Link>
          </p>
        </div>

        <Footer className="mt-auto w-full" />
      </AppContainer>
    </>
  );
}

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.redirectUrl) {
    return { props: { redirectTo: query.redirectUrl } };
  }
  return { props: {} };
};
