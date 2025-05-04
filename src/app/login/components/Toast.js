export default function Toast({ isVisible, status }) {
  return (
    <>
      <p
        role="alert"
        aria-live="assertive"
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg rounded-xl px-3 py-2 text-gray-800 text-center transition-all duration-500 ease-in-out ${
          status.includes("Form submitted successfully!")
            ? "text-green-600"
            : "text-red-600"
        } ${
          isVisible ? "translate-y-10 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        {status}
      </p>
    </>
  );
}
