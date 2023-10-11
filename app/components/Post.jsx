import 'app/globals.css'
import { Rubik } from 'next/font/google'  // Primary Pitt font
import { Open_Sans } from 'next/font/google'  // Secondary Pitt font
const rubik = Rubik({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })

export default function Post({category_id, post_id, title, description, subcategory, progress, pendingMod, isHidden}) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <br></br>
            <span>Subcategory: {subcategory}</span>
            
            {/* Note: We can have a different "progress" element shown a different element conditionally on the value of the progress arg rather than showing the user the raw flag value*/}
            <span>Current Progress: {progress}</span>

            {/* Note: We can also show a different thing entirely if the post is pending moderation or has been modded.*/}
        </div>
    )
}