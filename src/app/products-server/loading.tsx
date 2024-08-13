import React from "react";
const loading = () => {
  const loadSketeton = () => {
    const Skeleton = [];
    for (let i = 0; i < 10; i++) {
      Skeleton.push(
        <div className="flex flex-col w-72 h-96 bg-white justify-center items-center shadow shadow-slate-500">
          <div className="w-72 h-72 bg-slate-500 animate-pulse"></div>
          <h1 className="p-5 w-56 h-2 mx-16 bg-slate-500 animate-pulse my-4"></h1>
        </div>
      );
    }
    return Skeleton;
  };
  const Skeletons = loadSketeton();
  return (
    <>
      <div className="w-full grid grid-cols-4 place-items-center py-24 gap-y-7">
        {Skeletons.map((sk) => sk)}
      </div>
    </>
  );
};

export default loading;
