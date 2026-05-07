import type { FC } from 'react';

interface ProfileSectionHeaderProps {
  title: string;
}

export const ProfileSectionHeader: FC<ProfileSectionHeaderProps> = ({ title }) => {
  return (
    <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
      {title}
    </h2>
  );
};
