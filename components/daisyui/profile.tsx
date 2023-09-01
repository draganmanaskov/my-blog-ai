import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown";
import Icons from "../icons";
import { Button, buttonVariants } from "./button";
import { signOut } from "next-auth/react";

interface ProfileProps {
  session: any;
}

const Profile: FC<ProfileProps> = ({ session }) => {
  return (
    <DropdownMenu position={"end"} hover>
      <DropdownMenuTrigger>
        <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
          <div className="w-10 rounded-full">
            {session.user.image ? (
              <img src={session.user.image} />
            ) : (
              <img src="https://i.pravatar.cc/500?img=32" />
            )}
          </div>
        </label>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => {}}>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <a>Settings</a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <button onClick={() => signOut()}>Sign out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;

export const ProfileSkeleton = () => {
  return (
    <label
      tabIndex={0}
      className="btn-ghost btn-circle avatar btn bg-base-300"
    ></label>
  );
};
