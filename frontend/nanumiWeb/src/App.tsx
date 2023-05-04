import SideBar from './components/sidebar';

function App() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-row">
      <SideBar />
      <section className="flex-1">contentLEft</section>
      <section className="w-96 bg-gray-300 rounded-tl-lg">contentRight</section>
    </div>
  );
}

export default App;
