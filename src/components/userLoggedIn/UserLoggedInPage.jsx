import { useParams } from "react-router-dom";

export default function UserLoggedInPage() {
    const {userId} = useParams()
    console.log("logged in id: ", userId);
  return (
    <div>
        <h1>this is user logged in page: </h1>
    </div>
  )
}
