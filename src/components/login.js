import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "../css/login.css";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../store/actions/actions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const roots = useSelector((state) => state.roots);

  const onFinish = () => {
    dispatch(setAdmin());
  };
  useEffect(() => {
    if (roots.admin) {
      navigate("/");
    }
  }, [roots.admin]);

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="login">
      <Form
        className="form"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={t("username")}
          name="username"
          rules={[
            {
              required: true,
              message: t("usernameMessage"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("password")}
          name="password"
          rules={[
            {
              required: true,
              message: t("passwordMessage"),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>{t("remember")}</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {t("submit")}
          </Button>
        </Form.Item>
        <Button type="danger" onClick={navigateHome}>
          {t("homepage")}
        </Button>
      </Form>
    </div>
  );
}
