import { FormControl, Validators } from "@angular/forms";

export const loginModel = {
  name: new FormControl('', Validators.required),
  email: new FormControl('', [
    Validators.required, Validators.email
  ]),
}
