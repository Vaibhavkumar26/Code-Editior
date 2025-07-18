import { Header } from "./_components/Header";
import  EditorialPage  from "./_components/EditorialPage";
import  OutputPanel  from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EditorialPage /> 
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}