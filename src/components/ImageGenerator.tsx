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
      setInputValue("");
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
        setError("La longitud de entrada debe ser menor a 150 caracteres.");
      }
    } else {
      setError("Por favor ingresa un texto para generar la imagen.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError("");
  };

  return (
    <section className="text-gray-400 bg-slate-950 body-font h-dvh">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center">
          <h1 className="sm:text-6xl text-3xl mb-4 font-black text-center font-roboto_slab text-white">
            ImagiFy
          </h1>
          <p className="mb-8 leading-relaxed font-roboto_slab">
            Te permite generar imágenes a partir de descripciones textuales
            utilizando la magia de la inteligencia artificial. Simplemente
            escribe lo que deseas ver y nuestro sistema te sorprenderá con una
            imagen que cobra vida.
          </p>
          <div className="flex w-full md:justify-start justify-center items-end relative">
            <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
              <label
                htmlFor="hero-field"
                className="leading-7 font-roboto_slab text-sm text-gray-400"
              >
                Ingrese su texto aquí:
              </label>
              <input
                type="text"
                id="hero-field"
                autoComplete="off"
                name="hero-field"
                placeholder="Ejm: cachorro jugando en la playa"
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
              {isLoading ? "Generando..." : "Generar"}
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
              <span className="text-gray-100 font-roboto_slab">
                Ingrese un mensaje en la entrada
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGenerator;
