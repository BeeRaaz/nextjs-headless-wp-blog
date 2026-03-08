import Image from "next/image";

export default function Sidebar() {
  return (
    <>
      <aside className="sticky top-0 py-20 h-187.5 flex flex-wrap justify-center items-center text-foreground-02 lg:w-120">
        <div className="text-center">
          <h1 className="font-xanh leading-[90%] tracking-[-0.01em] text-[80px] mb-10">The Roam Report</h1>
          <Image
            src="/train.svg"
            alt="Train Image"
            width={120}
            height={110}
            className="mx-auto mb-6"
          />
          <p>
            Stories and photos of long walks, wrong turns, and everyday
            discoveries
          </p>
        </div>
        <div className="absolute bottom-5 w-full overflow-hidden">
          <div className="flex flex-nowrap whitespace-nowrap gap-4 w-max">
            <div className="flex flex-nowrap whitespace-nowrap gap-4 marquee">
              <span>Currently in</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>Dallol, Ethiopia</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>14.2417° N</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>40.3169° E</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
            </div>
            <div className="flex whitespace-nowrap gap-4 marquee">
              <span>Currently in</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>Dallol, Ethiopia</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>14.2417° N</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>40.3169° E</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
            </div>
            <div className="flex whitespace-nowrap gap-4 marquee">
              <span>Currently in</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>Dallol, Ethiopia</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>14.2417° N</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>40.3169° E</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
            </div>
            <div className="flex whitespace-nowrap gap-4 marquee">
              <span>Currently in</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>Dallol, Ethiopia</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>14.2417° N</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
              <span>40.3169° E</span>
              <Image src="/globe.svg" alt="Globe Icon" width={16} height={16} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
