import { ChangeEvent, useState } from "react";
import { TOKEN, API_URL } from "../utils/config";

const ImageGenerator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [error, setError] = useState<string>("");
  const inputClassName = error ? "error-input" : "";

  async function query() {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify({ inputs: inputValue }),
      });
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setImageSrc(objectURL);
      setError("");
      setInputValue(""); // Limpiar el valor del input
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleClick = () => {
    if (inputValue.trim() !== "") {
      if (inputValue.trim().length <= 150) {
        query();
        setError("");
      } else {
        setError("Input length should be less than 150 characters.");
      }
    } else {
      setError("Please enter a prompt for generating the image");
    }
  };

  // Función para manejar cambios en el input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Actualizar el valor del input
    setError(""); // Limpiar el error cuando el usuario comienza a corregir la entrada
  };

  return (
    <section className="text-gray-400 bg-slate-950 body-font h-dvh">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center">
          <h1 className="sm:text-6xl text-3xl mb-4 font-black text-center font-roboto_slab text-white">
            ImagiFy
          </h1>
          <p className="mb-8 leading-relaxed font-roboto_slab">
            La aplicación de generación de imágenes con texto mediante
            inteligencia artificial (IA) es una herramienta innovadora diseñada
            para crear encabezados visuales impactantes para páginas web.
            Utilizando algoritmos avanzados de IA.
          </p>
          <div className="flex w-full md:justify-start justify-center items-end relative">
            <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
              <label
                htmlFor="hero-field"
                className="leading-7 text-sm text-gray-400"
              >
                Placeholder
              </label>
              <input
                type="text"
                id="hero-field"
                autoComplete="off"
                name="hero-field"
                placeholder="enter"
                value={inputValue}
                onChange={handleChange}
                className={`font-roboto_slab w-full bg-gray-800 rounded bg-opacity-40 border border-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent focus:border-indigo-700 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${inputClassName}`}
              />
              {error && (
                <p className="absolute text-sm mt-2 text-red-500">{error}</p>
              )}
            </div>
            <button
              disabled={isLoading}
              onClick={handleClick}
              className={`ease-in-out duration-200 font-roboto_slab font-bold inline-flex text-white bg-indigo-700 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded text-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <div className="bg-gray-800 rounded-md flex items-center justify-center h-[450px]">
            {imageSrc ? (
              <img
                className="object-cover object-center rounded h-full w-full"
                alt="Generated Image"
                src={imageSrc}
              />
            ) : (
              <p className="text-gray-100 font-roboto_slab">
                Enter a prompt in the input
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGenerator;
