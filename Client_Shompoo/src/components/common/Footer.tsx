import { footerSections } from 'constants/footerSection'
import { paymentImageIds } from 'constants/paymentImage'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="w-full px-30 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="md:w-1/4 space-y-3">
<img src="/assets/images/logo-Hair.png" alt="Logo Hair" className='h-18 rounded-md ml-25'/>
            <p className="text-gray-600 text-sm leading-relaxed">
              Grabit is the biggest market of grocery products.
              <br />
              Get your daily needs from our store.
            </p>
            <div className="flex space-x-3">
           <div className="flex items-center gap-2 -ml-2.5">
  <img src="/assets/images/android.png.png" alt="Android" className=" rounded-md" />
  <img src="/assets/images/apple.png.png" alt="Apple" className=" rounded-md" />
</div>

            </div>
          </div>

         {footerSections.map((section, idx) => (
  <div key={idx} className="md:w-1/6 text-sm text-gray-700">
    <h3 className="font-semibold mb-3">{section.title}</h3>
    <ul className="space-y-1">
      {section.items.map((item, i) => (
        <li key={i} className="pb-1 border-b border-gray-100 last:border-none">
          {item}
        </li>
      ))}
    </ul>
  </div>
))}
          {/* Contact */}
          <div className="md:w-1/4 text-sm text-gray-700 space-y-3">
            <h3 className="font-semibold mb-3">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <i className="fas fa-map-marker-alt text-green-600 mt-1" />
                <p>2548 Broaddus Maple Court, Madisonville KY 4783, USA.</p>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-phone-alt text-green-600" />
                <p>+00 9876543210</p>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-green-600" />
                <p>example@email.com</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-2">
              {['facebook-f', 'twitter', 'linkedin-in', 'instagram'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-gray-800 text-white w-7 h-7 flex items-center justify-center rounded hover:bg-gray-700"
                  aria-label={icon}
                >
                  <i className={`fab fa-${icon} text-xs`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full border-t border-gray-200">
        <div className="w-full px-8 py-3 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p className="mb-2 md:mb-0">
            © <span className="text-green-600 font-semibold">LuxHair</span> – All rights reserved.
          </p>
         <div className="flex space-x-2">
  {paymentImageIds.map((id, i) => (
    <img
      key={i}
      src={`https://storage.googleapis.com/a1aa/image/${id}.jpg`}
      alt={`payment-${i}`}
      width={40}
      height={20}
    />
  ))}
</div>

        </div>
      </div>
    </footer>
  )
}

export default Footer