import {
  Controller,
  FormProvider,
  RegisterOptions,
  useFieldArray,
  useForm,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import { createHubvisor } from "./hubvisor.api";
import { DevTool } from "@hookform/devtools";
import { HTMLInputTypeAttribute, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HubvisorSchema, ZodHubvisor } from "./Zod";

export function CreateHubvisorRHF() {
  const methods = useForm<ZodHubvisor>({
    defaultValues: { firstName: "Toto" },
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(HubvisorSchema),
  });

  const { handleSubmit, control } = methods;

  function onSubmit(hubvisor: ZodHubvisor) {
    console.log("submitting form...");
    createHubvisor(hubvisor);
  }

  return (
    <main className="h-screen w-full">
      <h1>Créer un nouvel Hubvisor</h1>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfo />

          <HubInfo />

          <Skills />

          <button type="submit">Créer</button>
        </form>
      </FormProvider>

      <DevTool control={control} />
    </main>
  );
}

function FormInput({
  name,
  label,
  type,
  rules,
}: {
  name: keyof ZodHubvisor;
  label: string;
  type?: HTMLInputTypeAttribute;
  rules?: RegisterOptions<ZodHubvisor, keyof ZodHubvisor>;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ZodHubvisor>();

  console.log(errors);

  return (
    <div className="flex flex-col gap-1">
      <label className="flex gap-2 items-center">
        {`${label}${rules?.required ? "*" : ""}`}
        <input
          type={type ?? "text"}
          {...register(name)}
          className="w-[200px]"
        />
      </label>
      <span className="text-red-500 text-sm italic">
        {errors[name]?.message}
      </span>
    </div>
  );
}

function PersonalInfo() {
  return (
    <>
      <h2>Infos personnelles</h2>
      <div className="flex gap-2 items-start">
        <FormInput name="name" label="Nom" rules={{ required: true }} />
        <FormInput name="firstName" label="Prénom" rules={{ required: true }} />
        <FormInput
          name="age"
          type="number"
          label="Âge"
          //   errorsToDisplay={
          //     <span className="text-red-500 text-sm italic">
          //       {errors.age?.message}
          //       {/* {errors.age?.type === "min" && "L'âge minimum est 18 ans"}
          //       {errors.age?.type === "max" && "L'âge maximum est 99 ans"}
          //       {errors.age?.type === "required" && "Ce champ est obligatoire"} */}
          //     </span>
          //   }
        />
        <FormInput
          name="email"
          type="email"
          label="Adresse mail"
          rules={{ required: true }}
          //   errorsToDisplay={
          //     <span className="text-red-500 text-sm italic">
          //       {errors.email?.type === "pattern" &&
          //         "L'adresse mail n'est pas valide"}
          //       {errors.email?.type === "required" && "Ce champ est obligatoire"}
          //     </span>
          //   }
        />
      </div>
    </>
  );
}

function HubInfo() {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext<ZodHubvisor>();

  const practice = useWatch<ZodHubvisor, "practice">({ name: "practice" });

  function getManagerOptions() {
    let options = ["None"];
    switch (practice) {
      case "epic":
        options = [...options, "Dimitri", "Ada"];
        break;
      case "atom":
        options = [...options, "Antoine"];
        break;
      case "source":
        options = [...options, "Charles", "Alvin"];
        break;
    }

    return options.map((option) => (
      <option key={option} value={option.toLowerCase()}>
        {option}
      </option>
    ));
  }

  useEffect(() => {
    if (practice) setValue("manager", "none");
  }, [practice]);

  return (
    <>
      <h2>Hub</h2>
      <div className="flex gap-2 items-start">
        <div className="flex flex-col gap-1">
          <label className="flex gap-2 items-center">
            Practice*
            <Controller
              name="practice"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Sélectionner une practice</option>
                  <option value="epic">Epic</option>
                  <option value="source">Source</option>
                  <option value="atom">Atom</option>
                </select>
              )}
            />
          </label>
          <span className="text-red-500 text-sm italic">
            {errors.practice?.message}
          </span>
        </div>

        <label className="flex gap-2 items-center">
          Manager
          <select
            {...register("manager", { required: true })}
            disabled={!practice}
          >
            {getManagerOptions()}
          </select>
          <span className="text-red-500 text-sm italic">
            {errors.manager?.message}
          </span>
        </label>

        <FormInput
          name="seniority"
          type="number"
          label="Ancienneté (années)"
          rules={{ required: true, min: 0, max: 50 }}
          //   errorsToDisplay={
          //     <span className="text-red-500 text-sm italic">
          //       {errors.seniority?.type === "min" &&
          //         "L'ancienneté doit être supérieure à 0"}
          //       {errors.seniority?.type === "max" &&
          //         "L'ancienneté maximum est 50 ans"}
          //       {errors.seniority?.type === "required" &&
          //         "Ce champ est obligatoire"}
          //     </span>
          //   }
        />
      </div>
    </>
  );
}

function Skills() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ZodHubvisor>();
  const { fields, append, remove } = useFieldArray({ name: "skills" });

  return (
    <>
      <h2>Compétences</h2>
      <button type="button" onClick={() => append({ name: "", level: 1 })}>
        Ajouter une compétence
      </button>
      <ul className="flex flex-col gap-2 p-0 list-none">
        {fields.map((field, index) => (
          <li key={field.id} className="flex gap-10">
            <div className="flex flex-col gap-1">
              <label className="flex gap-2 items-center">
                Nom*
                <input
                  type="text"
                  {...register(`skills.${index}.name`, { required: true })}
                />
              </label>
              {errors.skills?.[index]?.name && (
                <span className="text-red-500 text-sm italic">
                  Ce champ est obligatoire
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex gap-2 items-center">
                Niveau* (1-10)
                <input
                  type="number"
                  {...register(`skills.${index}.level`, {
                    required: true,
                    min: 1,
                    max: 10,
                  })}
                />
              </label>
              {errors.skills?.[index]?.level && (
                <span className="text-red-500 text-sm italic">
                  {errors.skills?.[index]?.level.type === "min" &&
                    "Le niveau minimum est 1"}
                  {errors.skills?.[index]?.level.type === "max" &&
                    "Le niveau maximum est 10"}
                  {errors.skills?.[index]?.level.type === "required" &&
                    "Ce champ est obligatoire"}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={index === 0}
              className="self-start"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
