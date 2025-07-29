import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, FormFeedback } from "reactstrap";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    checkbox: "",
  });
  const [formValid, setFormValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

 useEffect(() => {
  const newErrors = { email: "", password: "", checkbox: "" };

  if (email && !emailRegex.test(email)) {
    newErrors.email = "Geçerli bir email giriniz.";
  }
  if (password && !passwordRegex.test(password)) {
    newErrors.password = "Şifre en az 8 karakter, 1 büyük harf ve 1 sayı içermelidir.";
  }
  if (!checked) {
    newErrors.checkbox = "Devam etmek için kutucuğu işaretleyiniz.";
  }

  setErrors(newErrors);

  const hasErrors = Object.values(newErrors).some((err) => err !== "");
  setFormValid(!hasErrors);
}, [email, password, checked]);

const handleSubmit = (e) => {
  e.preventDefault();
  if (formValid) {
    navigate("/success");
  } else {
    alert("Lütfen tüm alanları doğru doldurun.");
  }
};

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Emailinizi giriniz."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          invalid={!!errors.email}
        />
        <FormFeedback>{errors.email}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="password">Password:</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Parolanızı giriniz."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          invalid={!!errors.password}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>

      <FormGroup check>
        <Input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          invalid={!!errors.checkbox}
        />
        <Label check>Kabul Ediyorum</Label>
        {errors.checkbox && (
          <div style={{ color: "red", fontSize: "0.9rem" }}>{errors.checkbox}</div>
        )}
      </FormGroup>

      <Button type="submit" disabled={!formValid}>
        Giriş Yap
      </Button>
    </Form>
  );
}
