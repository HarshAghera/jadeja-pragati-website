import Image from "next/image";

type MissionCardProps = {
  icon: string; 
  title: string;
  desc: string;
};

const MissionCard = ({ icon, title, desc }: MissionCardProps) => {
  return (
    <div className="card">
      <div>
        <div className="icons">
          <Image src={icon} alt={title + " icon"} width={60} height={60} />
        </div>
        <h3>{title}</h3>
        <div className="content">
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
