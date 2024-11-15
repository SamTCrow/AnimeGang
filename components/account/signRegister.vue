<script setup lang="ts">
import { z } from "zod";

const emit = defineEmits(["close"]);
const { fetch } = useUserSession();

const schemaLogIn = z.object({
  username: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters")
});

const schemaRegister = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  repeatPassword: z.string(),
  name: z.string()
});

type SchemaLogIn = z.output<typeof schemaLogIn>;
type SchemaRegister = z.output<typeof schemaRegister>;

const items = [
  {
    key: "signin",
    label: "Sign In"
  },
  {
    key: "register",
    label: "Register"
  }
];

const logInForm = reactive({ username: "", password: "" });
const registerForm = reactive({
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
  name: ""
});
const error = ref("");

const onLogin = async (form: SchemaLogIn) => {
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        username: form.username,
        password: form.password
      }
    });
    emit("close");
    fetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error.value = err?.statusMessage;
  } finally {
    logInForm.password = "";
    logInForm.username = "";
  }
};

const onRegister = async (form: SchemaRegister) => {
  try {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        username: form.username,
        password: form.password,
        repeatPassword: form.repeatPassword,
        name: form.name,
        email: form.email
      }
    });
    emit("close");
    fetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error.value = err?.statusMessage;
  }
};
</script>

<template>
  <UTabs :items="items" class="w-full">
    <template #item="{ item }">
      <UCard
        @submit.prevent="
          () =>
            item.key === 'signin'
              ? onLogin(logInForm)
              : onRegister(registerForm)
        "
      >
        <template #header>
          <span class="text-red-500">{{ error }}</span>
        </template>
        <div v-if="item.key === 'signin'">
          <UForm
            :schema="schemaLogIn"
            class="space-y-3"
            :state="logInForm"
            @submit.prevent="() => onLogin(logInForm)"
          >
            <UFormGroup label="Username" name="username">
              <UInput v-model="logInForm.username" placeholder="Username" />
            </UFormGroup>
            <UFormGroup label="Password" name="password">
              <UInput
                v-model="logInForm.password"
                placeholder="Password"
                type="password"
              />
            </UFormGroup>
          </UForm>
        </div>
        <div v-else-if="item.key === 'register'" class="space-y-3">
          <UForm
            :schema="schemaRegister"
            class="space-y-3"
            :state="registerForm"
            @submit.prevent="() => onRegister(registerForm)"
          >
            <UFormGroup label="Name" name="name" required>
              <UInput v-model="registerForm.name" required />
            </UFormGroup>
            <UFormGroup label="Email" name="email" required>
              <UInput v-model="registerForm.email" type="email" required />
            </UFormGroup>
            <UFormGroup label="Username" name="username" required>
              <UInput v-model="registerForm.username" required />
            </UFormGroup>
            <UFormGroup label="Password" name="password" required>
              <UInput
                v-model="registerForm.password"
                type="password"
                required
              />
            </UFormGroup>
            <UFormGroup label="Repeat Password" name="repeat" required>
              <UInput
                v-model="registerForm.repeatPassword"
                type="password"
                required
              />
            </UFormGroup>
          </UForm>
        </div>

        <template #footer>
          <UButton
            type="submit"
            color="white"
            size="xl"
            class="w-full justify-center"
          >
            {{ item.key === "signin" ? "Sign Up" : "Register" }}
          </UButton>
          <UDivider label="OR" class="py-2" />
          <UButton
            icon="devicon:google"
            size="xl"
            label="Sign up with Google"
            color="white"
            to="/api/auth/google"
            class="w-full justify-center text-center"
            external
          />
        </template>
      </UCard>
    </template>
  </UTabs>
</template>
