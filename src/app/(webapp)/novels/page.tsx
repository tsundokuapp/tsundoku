import Image from 'next/image';

export default function Novels() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <Image
        src="/404.png"
        alt="404"
        className="overflow-hidden"
        width={480}
        height={480}
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold uppercase">Página em construção</h1>
        <p>Em breve teremos novidades!</p>
      </div>
    </div>
  );
}
