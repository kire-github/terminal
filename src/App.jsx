import Input from "./Input";

export default function App() {
    return (
        <div className="h-screen bg-black text-green-400 font-mono p-4">
            <Input onEnter={() => {console.log("Hit enter")}}/>
        </div>
    );
}