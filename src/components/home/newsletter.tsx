export default function Newsletter() {
  return (
    <div className="flex w-full px-10 py-20">
      <div
        style={{
          backgroundImage:
            "linear-gradient( -217deg, #0019FF, #0019FF 0 7%, #080DBA 0 12%, #080DBA 0 20%, #0019FF  80%, #080DBA 0 100%)",
        }}
        className="flex flex-col gap-10 py-16 w-full rounded-xl"
      >
        <div className="mx-auto flex flex-col text-black text-center">
          <span className="font-racing text-[2.5rem] uppercase">
            newsletter
          </span>
          <span className="font-semibold">
            Enter your email to start your journey
          </span>
        </div>

        <div className="mx-auto flex flex-no-wrap bg-white rounded-lg">
          <input
            placeholder="Enter your email"
            className="flex w-full pl-4 py-4 rounded-lg outline-none"
          />
          <button className="px-10 py-4 text-white rounded-lg bg-deep_blue capitalize">
            <span>subscribe</span>
          </button>
        </div>
      </div>
    </div>
  );
}
