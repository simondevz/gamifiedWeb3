export default function Newsletter() {
  return (
    <div className="flex w-full px-10 py-20">
      <div
        style={{
          backgroundImage:
            "linear-gradient( -217deg, #0019FF, #0019FF 0 7%, #080DBA 0 12%, #080DBA 0 20%, #0019FF  80%, #080DBA 0 100%)",
        }}
        className="flex flex-col max-sm:gap-6 max-xs:gap-4 gap-10 max-sm:py-8 max-xs:py-4 py-16 w-full rounded-xl max-xs:px-8"
      >
        <div className="mx-auto flex flex-col text-black text-center">
          <span className="font-racing max-sm:text-[1.5rem] text-[2.5rem] uppercase">
            newsletter
          </span>
          <span className="font-semibold max-sm:text-[0.875rem] max-xs:text-[0.75rem]">
            Enter your email to start your journey
          </span>
        </div>

        <div className="mx-auto flex flex-no-wrap bg-white rounded-lg">
          <input
            placeholder="Enter your email"
            className="flex w-full max-sm:pl-2 pl-4 py-4 max-md:py-2 max-sm:text-[0.875rem] max-xs:text-[0.75rem] rounded-lg outline-none"
          />
          <button className="px-10 max-sm:px-4 max-xs:px-2 max-md:py-2 py-4 max-sm:text-[0.875rem] max-xs:text-[0.75rem] text-white rounded-lg bg-deep_blue capitalize">
            <span>subscribe</span>
          </button>
        </div>
      </div>
    </div>
  );
}
