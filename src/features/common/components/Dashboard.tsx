import { FC, ReactNode } from "react";

interface DashboardProps {
  children?: ReactNode;
}

const Dashboard: FC<DashboardProps> = ({ children }) => {
  return (
    <div>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
