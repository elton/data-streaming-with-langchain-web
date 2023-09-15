import type { Component, JSX } from "solid-js";
import { createSignal, createResource, Suspense } from "solid-js";

const Main: Component = (): JSX.Element => {
  const postFormData = async (formData: FormData) => {
    const response = await fetch("/api/llm", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("data:", data);
    return data;
  };

  const [formData, setFormData] = createSignal<FormData>();
  const [response] = createResource(formData, postFormData);

  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("prompt", (e.target as HTMLFormElement).prompt.value);
    setFormData(form_data);
  };

  return (
    <>
      <div id="result" class="p-5 w-2/3 mx-auto">
        <Suspense>{response() && <p>{response().message.prompt}</p>}</Suspense>
      </div>

      <div class="fixed bottom-16 w-full">
        <form
          class="flex px-5 py-2 border border-cyan-800/10 rounded-lg shadow-lg w-2/3 min-w-max mx-auto"
          onSubmit={submit}
        >
          <input
            id="prompt"
            type="text"
            placeholder="请输入你的问题"
            class="px-2 py-1 rounded-md w-1/2 mx-auto flex-1 outline-none text-cyan-800"
          />
          <button
            id="send"
            class="bg-cyan-900 text-white px-5 py-1 rounded-md justify-end mx-auto"
          >
            发送
          </button>
        </form>
      </div>
    </>
  );
};

export default Main;
