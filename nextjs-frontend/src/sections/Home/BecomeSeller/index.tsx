import TextInput from "components/TextInput";
import UnderlineButton from "components/UnderlinedButton";
import React, { useState } from "react";
import SellersSVG from "components/SellersSVG";
import clsx from "clsx";
import MessageBox from "components/MessageBox";
import Message from "components/MessageBox/Message";
import { useForm } from "react-hook-form";

const emailRule = {
  required: {
    value: true,
    message: "Por favor completa este campo",
  },
  pattern: {
    value: /^\S+@\S+$/i,
    message: "Email invalido",
  },
};
interface BecomeSellerProps {
  className?: string;
}

export default function BecomeSeller({ className }: BecomeSellerProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onBlur" });
  const onSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 10000);
  };

  return (
    <div
      id="become-seller"
      className={clsx(
        "w-full flex items-center flex-col md:flex-row justify-center",
        className
      )}
    >
      <SellersSVG className="max-w-sm md:max-w-md 2xl:max-w-2xl mb-8 md:mr-8 md:mb-0" />

      <div className="relative">
        <h2 className="text-2xl font-medium max-w-lg">
          ¿Te gustaría vender tus comidas a miles de personas?
        </h2>

        <p className="mt-6 max-w-md">
          Dejanos tu email para poder contactarte. A la brevedad te enviaremos
          toda la información necesaria.
        </p>

        <form
          className="flex flex-col items-start sm:flex-row mt-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            {...register("seller-email", emailRule)}
            error={errors["seller-email"]?.message}
            className="mb-4 sm:mb-0 sm:mr-6"
            width="w-full sm:w-96"
            placeholder="Tu email"
            label="seller-email"
            hideLabel
          />
          <UnderlineButton style="secondary" type="submit">
            Enviar
          </UnderlineButton>
        </form>

        <MessageBox style="success" className="absolute -bottom-14 w-full">
          <Message show={submitted}>
            ¡Listo! Pronto nos comunicaremos con vos.
          </Message>
        </MessageBox>
      </div>
    </div>
  );
}
