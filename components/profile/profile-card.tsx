import { ClientUser } from "@/types";
import { DotsHorizontalIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { FC } from "react";
import { Avatar } from "../user/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { normalizeText } from "@/lib/normalize-text";
import { ProfileTabs } from "./profile-tabs/profile-tabs";
import { MdOutlineSettings } from "react-icons/md";

interface ProfileCardProps {
    userData: ClientUser,
    isOwner: boolean
}

const ProfileCard: FC<ProfileCardProps> = ({
    userData,
    isOwner
}) => {
    return (
        <div className="border grid gap-y-4 rounded-xl overflow-x-hidden pb-5">
            <div className="grid relative">
                <div className="bg-gradient-to-r from-slate-300 to-neutral-200 h-20 w-full relative" />
                <div className="w-16 absolute left-2 top-2">
                    <Avatar src={userData.image} user={userData} />
                </div>
                <div className="inline-flex items-center justify-between py-3 px-3">
                    <div className="grid gap-y-2">
                        <div className="inline-flex items-center gap-x-2">
                            <span className="font-medium text-lg">{userData.name}</span>
                            <span>·</span>
                            <span className={`font-bold text-md ${userData.role === 'ADMIN' ? `bg-gradient-to-r from-sky-600 to-fuchsia-500 bg-clip-text text-transparent` : `text-muted-foreground`}`}>{normalizeText(userData.role)}</span>
                        </div>
                        <span className="font-medium text-xs text-muted-foreground">{userData.email}</span>
                        <span className="font-medium text-sm text-muted-foreground">from {userData.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="">
                        {isOwner ?
                            <Link href={'/profile/settings'}>
                                <Button type="button" size={'sm'} variant={'ghost'}>
                                    <MdOutlineSettings className="hover:animate-spin" size={20}/>
                                </Button>
                            </Link> :
                            <div className="inline-flex items-center gap-2">
                                <Button type="button" size={'sm'} className="px-6">
                                    Follow
                                </Button>
                                <Button type="button" size={'sm'} variant={'ghost'}>
                                    <DotsHorizontalIcon />
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <hr className="w-[90%] mx-auto" />
            <div className="px-2 mt-2">
                <ProfileTabs userId={userData.id} />
            </div>
        </div>
    );
}

export default ProfileCard;