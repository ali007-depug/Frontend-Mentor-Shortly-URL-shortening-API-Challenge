import Button from "./Button"
export default function Booster(){

    return(
        <div className="bg-[url(bg-boost-mobile.svg)] sm:bg-[url(bg-boost-desktop.svg)] bg-p-darkViolet w-full pb-10">
            <h1 className="text-center text-3xl text-white font-extrabold mt-10 mb-5">Boost your links today</h1>
            <Button title={'get started'} customStyle="mx-auto"/>
        </div>
    )
}