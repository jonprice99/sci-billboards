import Link from "next/link"
import styles from 'app/board/Board.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faMessage, faFlag, faArrowLeft, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export async function getStaticPaths() {
    // This is where we'd have to pull the paths for each post from the database
    const paths = [

    ];

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { category, id } = params;

    // Fetch data from data source using category and id
    const postData = await fetch(`/api/posts/${category}/${id}`).then((res) =>
        res.json()
    );

    return {
        props: {
            postData,
        },
    };
}

export default function post({ postData }) {
    // This is the webpage that will be returned and viewable to the user
    return (
        <div>
            <h1>{postData.title}</h1>
            <p>{postData.content}</p>
        </div>
    );
}