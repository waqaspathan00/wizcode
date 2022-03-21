/* React JS Template using functions */
import React, {useContext, useEffect} from "react"
import Link from "next/link";
import {toast} from "react-hot-toast";
import {firestore, auth, googleAuthProvider} from "../lib/firebase";
import {UserContext} from "../lib/context";

export default function Navbar() {
    const {user} = useContext(UserContext);

    return (
        <header className={"flex p-6 justify-between items-center"}>
            <img className={"w-16 cursor-pointer"} src="/logo.png" alt="logo"/>

            <ul className={"list-none flex text-lg"}>
                <li className={"px-4 py-2 transition-all hover:border-b-2 hover:border-b-gold"}>
                    <Link href="/">
                        <a className={""}>
                            HOME
                        </a>
                    </Link>
                </li>

                <li className={"px-4 py-2 transition-all hover:border-b-2 hover:border-b-gold"}>
                    <Link href="/lessons/">
                        <a className={""}>
                            LESSONS
                        </a>
                    </Link>
                </li>

                <li className={"px-4 py-2 transition-all hover:border-b-2 hover:border-b-gold"}>
                    <Link
                        href="https://www.etsy.com/listing/1114882742/wizcode-t-shirt-coding-unisex-men-and?click_key=b05d86769133b63325820913eca68044149e5746%3A1114882742&click_sum=fbaef5fe&rec_type=ss&ref=landingpage_similar_listing_top-1"
                        passHref>
                        <a target={"_blank"} className={""}>
                            MERCH
                        </a>
                    </Link>
                </li>

                <li className={"px-4 py-2 transition-all hover:border-b-2 hover:border-b-gold"}>
                    <Link href="/invoices">
                        <a className={""}>
                            INVOICES
                        </a>
                    </Link>
                </li>
            </ul>

            <a href="#">
                {user ?
                    <SignOutButton/>
                    :
                    <SignInButton/>
                }
            </a>
        </header>
    )
}

function SignInButton() {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    }

    useEffect(() => {
        return () => {
            toast.success("Signed in")
        }
    }, [])

    return (
        <button className={"btn-google px-4 py-4 bg-darkgold rounded-lg"} onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    )
}

function SignOutButton() {
    const signOutwithGoogle = async () => {
        await auth.signOut()
        localStorage.removeItem("email")
    }

    useEffect(() => {
        return () => {
            toast.success("Successfully signed out")
        }
    }, [])

    return <button className={"px-4 py-4 bg-darkgold rounded-lg"} onClick={signOutwithGoogle}>Sign Out</button>
}
