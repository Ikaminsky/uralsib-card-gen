import React from 'react';
import WorldCard from '../assets/world_card.png';

export const CreditCard = ({ image, name }: { image: string, name: string }) => {
    return (
        <div className=''>
            <div
                id="card"
                className="border-2 border-black relative w-96 h-60 rounded-2xl font-mono text-white overflow-hidden cursor-pointer transition-all duration-500"
                style={{transition: "0.6s", transformStyle: "preserve-3d"}}
            >
                <img
                    src={image}
                     style={{
                         zIndex: 42,
                         position: 'absolute',
                         mixBlendMode: 'screen'
                     }}
                     alt="card background"
                />
                <div
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-center gap-6 p-6 bg-gradient-to-tr from-gray-900 to-gray-700 transition-all duration-100 delay-200 z-40" style={{transform: "rotateY(0deg)" }}>

                    <div className="flex justify-between items-center">
                        <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt='Smart card' className="w-12" />

                            <img src={WorldCard} alt="World card image" className="w-24" />
                    </div>

                    <div className="">
                        <label htmlFor="" className="hidden">Card Number</label>
                        <input type="text" id="" value="**** **** **** ****" readOnly
                               className="outline-none w-full bg-transparent text-center text-2xl"/>
                    </div>

                    <div className="w-full flex flex-row justify-between">

                        <div className="w-full flex flex-col">
                            <label htmlFor="">Card holder</label>
                            <input type="text" id="" value={name} readOnly
                                   className="outline-none bg-transparent" />
                        </div>

                        <div className="w-1/4 flex flex-col">
                            <label htmlFor="">Expires</label>
                            <input type="text" id="" value="12/34" readOnly className="outline-none bg-transparent" />
                        </div>

                    </div>

                </div>

                <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-3 justify-center bg-gradient-to-tr from-gray-900 to-gray-700 transition-all z-10"
                     style={{transform: "rotateY(180deg)" }}>

                    <div className="w-full h-12 bg-black"></div>

                    <div className="px-6 flex flex-col gap-6 justify-center">
                        <div className="flex flex-col items-end">
                            <label htmlFor="">CVV</label>
                            <input type="text" id="" value="123" readOnly
                                   className="outline-none rounded text-black w-full h-8 text-right"
                                   style={{background: "repeating-linear-gradient(45deg, #ededed, #ededed 5px, #f9f9f9 5px, #f9f9f9 10px)"}}/>
                        </div>


                        <div className="flex justify-start items-center">
                            <img src={WorldCard} alt="World card image" className="w-24" />
                        </div>

                    </div>

                </div>
            </div>
        </div>

);
};
