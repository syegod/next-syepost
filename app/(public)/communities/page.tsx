import { CommunityCard } from '@/components/communities/community-card';
import { sidebar_themes } from '@/constants';
import { FC } from 'react';

interface CommunitiesPageProps {    
}

const CommunitiesPage: FC<CommunitiesPageProps> = async ({
    
}) => {

    return (
        <div className='flex flex-wrap justify-between gap-5'>
            {sidebar_themes.map((e, i) => (
                <CommunityCard key={i} data={e}/>
            ))}
        </div>
    )
}
export default CommunitiesPage