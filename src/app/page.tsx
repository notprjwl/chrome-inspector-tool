import InspectorTool from "@/components/InspectorTool";
import ElementInspector from "@/components/ElementInspector";
import ClassEditor from "@/components/ClassEditor";

export default function Home() {
  return (
    <div className='min-h-screen flex'>
      <div className='flex-1 p-8'>
        <div className='mb-4'>
          <InspectorTool />
        </div>
        <div className='space-y-8'>
          <div className='p-6 bg-white rounded-lg shadow-sm border'>
            <h2 className='text-3xl font-bold mb-4 tracking-tighter'>Chrome Inspector Tool</h2>
            <p className='text-gray-600'>Click the inspect button and hover over elements</p>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='p-4 bg-blue-50 rounded-lg'>
              <h3 className='text-lg font-semibold mb-2'>Box 1</h3>
              <p className='text-sm'>Hover to inspect elements</p>
            </div>
            <div className='p-4 bg-green-50 rounded-lg'>
              <h3 className='text-lg font-semibold mb-2'>Box 2</h3>
              <p className='text-sm'>Click to edit classes</p>
            </div>
          </div>

          <div className='flex justify-evenly items-center mt-8'>
            <div className='w-24 h-24 bg-red-200'></div>
            <div
              className='w-24 h-24 bg-blue-200 '
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}></div>
            <div className='w-24 h-24 rounded-full bg-orange-100 to-blue-200 shadow-sm'></div>
          </div>
        </div>

        <ElementInspector />
      </div>

      <div className='w-80 border-l border-gray-200 bg-white overflow-y-auto'>
        <ClassEditor />
      </div>
    </div>
  );
}
