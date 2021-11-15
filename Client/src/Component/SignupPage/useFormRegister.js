import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Intern } from "../../Service/User.service";

const axios = require("../../Service/axios");
const useFormRegister = (callback, validate) => {
  const [values, setValues] = useState({
    name: "",
    userName: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  const onsubmit = (e) => {
    setIsSubmitting(true);
  };
  useEffect(async () => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log(values);
      toast.configure();
      await Intern.SignUp({ ...values })
        .then((res) => {
          toast.success("Đăng ký thành công", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          console.log(res);
          window.location = "/signin";
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    }
  }, [errors, values]);

  return { handleChange, handleSubmit, values, errors };
};

export default useFormRegister;
