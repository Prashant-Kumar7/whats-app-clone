export default function ProfileList(){
  return (
      <div style={{height: "100vh"}} className=" w-screen flex flex-col gap-4 p-6">
          <div className="p-6 bg-red-400">
              <span className="text-3xl">Profile List</span>
          </div>
          <div className="p-4 bg-blue-400">
              <span className="text-xl">Profile Name</span>
          </div>
      </div>
  )
}