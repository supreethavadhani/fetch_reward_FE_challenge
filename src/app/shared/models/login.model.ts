import { FormControl, Validators } from "@angular/forms";

export const loginModel = {
    name: new FormControl('test', Validators.required),
    email: new FormControl('test@test.com', [
      Validators.required, Validators.email
    ]),
  }
