import React from 'react'

export const Etuprofile = () => {
  return (
    <div>
        <div >    {/* left profile */}
           <div className='flex'>   {/* img +name */}
            <img src="src/assets/user.png" alt="Profile" className="rounded-full w-28 h-28 mx-auto" />
            <h2 className="text-2xl font-semibold ">Henni chahd</h2>
            <h3 className="text-xl font-medium ">Student</h3>
           </div>
        </div>
    </div>
  )
}

export default Etuprofile
