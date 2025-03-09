import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Hubvisor } from "./hubvisor.types";
import { createHubvisor } from "./hubvisor.api";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

export function CreateHubvisorRHF() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Hubvisor>();

  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  const practice = watch("practice");

  function onSubmit(hubvisor: Hubvisor) {
    console.log("submitting form...");
    createHubvisor(hubvisor);
  }

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
    <main className="h-screen w-full">
      <h1>Créer un nouvel Hubvisor</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Infos personnelles</h2>

        <div className="flex gap-2 items-start">
          <div className="flex flex-col gap-1">
            <label className="flex gap-2 items-center">
              Nom*
              <input type="text" {...register("name", { required: true })} />
            </label>
            {errors.name && (
              <span className="text-red-500 text-sm italic">
                Ce champ est obligatoire
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex gap-2 items-center">
              Prénom*
              <input
                type="text"
                {...register("firstName", { required: true })}
              />
            </label>
            {errors.firstName && (
              <span className="text-red-500 text-sm italic">
                Ce champ est obligatoire
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex gap-2 items-center">
              Âge
              <input type="number" {...register("age", { min: 18, max: 99 })} />
            </label>
            {errors.age && (
              <span className="text-red-500 text-sm italic">
                {errors.age.type === "min" && "L'âge minimum est 18 ans"}
                {errors.age.type === "max" && "L'âge maximum est 99 ans"}
                {errors.age.type === "required" && "Ce champ est obligatoire"}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex gap-2 items-center">
              Adresse mail*
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern:
                    /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
                })}
                className="w-[200px]"
              />
            </label>
            {errors.email && (
              <span className="text-red-500 text-sm italic">
                Ce champ est obligatoire
              </span>
            )}
          </div>
        </div>
        <h2>Hub</h2>
        <div className="flex gap-2 items-start">
          <div className="flex flex-col gap-1">
            <label className="flex gap-2 items-center">
              Practice*
              {/* <select {...register("practice", { required: true })}>
                <option value="">Sélectionner une practice</option>
                <option value="epic">Epic</option>
                <option value="source">Source</option>
                <option value="atom">Atom</option>
              </select> */}
              <Controller
                name="practice"
                control={control}
                rules={{ required: true }}
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
            {errors.practice && (
              <span className="text-red-500 text-sm italic">
                Ce champ est obligatoire
              </span>
            )}
          </div>
          <label className="flex gap-2 items-center">
            Manager
            <select
              {...register("manager", { required: true })}
              disabled={!practice}
            >
              {getManagerOptions()}
            </select>
          </label>
          <div className="flex flex-col gap-1">
            <label className="flex gap-2 items-center">
              Ancienneté* (années)
              <input
                type="number"
                {...register("seniority", { required: true, min: 0, max: 50 })}
              />
            </label>
            {errors.seniority && (
              <span className="text-red-500 text-sm italic">
                {errors.seniority.type === "min" &&
                  "L'ancienneté doit être supérieure à 0"}
                {errors.seniority.type === "max" &&
                  "L'ancienneté maximum est 50 ans"}
                {errors.seniority.type === "required" &&
                  "Ce champ est obligatoire"}
              </span>
            )}
          </div>
        </div>

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

        <button type="submit">Créer</button>
      </form>

      <DevTool control={control} />
    </main>
  );
}
