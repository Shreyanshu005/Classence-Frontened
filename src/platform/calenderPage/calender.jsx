import React from 'react';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import CalendarComponent from './calenderComp';
import Reminders from '../reminder/reminder'


const Calender = () => {
 


    

    return (<div className='bg-[#E1EAE8] h-[100vh] fixed w-full top-0 overflow-y-auto '>

        <Sidebar/>
        <Header/>
        <div>
        <CalendarComponent/>
        </div>

        
      
       
       
        
        </div>
        
        
   
    );
};

export default Calender;
