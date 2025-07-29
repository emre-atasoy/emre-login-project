import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";

export default function Login() {
    return (

        <Form>
  <FormGroup>
    <Label for="email">
      Email:
    </Label>
    <Input
      id="email"
      name="email"
      placeholder="Emailinizi giriniz."
      type="email"
    />
  </FormGroup>
  <FormGroup>
    <Label for="password">
      Password:
    </Label>
    <Input
      id="password"
      name="password"
      placeholder="Parolanızı giriniz."
      type="password"
    />
  </FormGroup>
 
  <FormGroup check>
    <Input type="checkbox" />
    {' '}
    <Label check>
      Kabul Ediyorum
    </Label>
  </FormGroup>
  <Button>
    Giriş Yap
  </Button>
</Form>
    )
}