"use client";

import { Flex, Typography } from "antd";
import React from "react";
import CoreInput from "@/components/form/input/input";
import CoreButton from "@/components/button/button";
import useLoginForm from "../hooks/use-login-form";

const LoginForm = () => {
  const { values, isSubmitting, handleChange, handleSubmit, errors } =
    useLoginForm();

  return (
    <div className="w-full flex justify-center items-center grow">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[420px] flex flex-col justify-center gap-y-6"
      >
        <div className="w-full">
          {/* <Typography.Text className="!text-[17px]">
            Halo, Selamat datang kembali
          </Typography.Text> */}
          <Typography.Title
            level={2}
            className="!font-bold !mt-2 !text-[29px] !mb-0"
          >
            Log In Inven<span className="text-accent">Track</span>
          </Typography.Title>
          <Typography.Text>Your inventory management solution.</Typography.Text>
        </div>

        {/* <div>
          <Flex gap={12}>
            <Button className="px-[30px] h-12 !w-full" onClick={GoogleLogin}>
              <Image
                src="/google-logo.png"
                alt="google"
                unoptimized
                width={20}
                height={20}
                className="mr-1 lg:mr-2"
              />
              Masuk menggunakan Google
            </Button>
          </Flex>
          <Divider className="!mb-0">
            <span className="text-[12ptx] leading-4 text-neutral-70 rounded-full px-3 bg-neutral-95">
              Atau masuk menggunakan
            </span>
          </Divider>
        </div> */}

        <CoreInput
          placeholder="Enter your email"
          label="Email/no HP"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          // autoFocus
          required
        />
        <CoreInput.Password
          placeholder="Enter your password"
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <Flex gap={8}>
          <CoreButton
            loading={isSubmitting}
            htmlType="submit"
            type="primary"
            size="large"
            className="w-full"
          >
            Login
          </CoreButton>
        </Flex>

        {/* <div className="w-full justify-center">
          <Typography.Paragraph className="!text-gray font-medium text-center mb-[14px]">
            Belum punya akun?{" "}
            <Link
              href={ROUTES.AUTH.REGISTER}
              className="font-medium !text-accent underline"
            >
              Daftar{" "}
            </Link>
          </Typography.Paragraph>
        </div> */}
      </form>
    </div>
  );
};

export default LoginForm;
