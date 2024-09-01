import Conclusion from "./conclusion/page";
import Introduction from "./introduction/page";
import LandUse from "./landuse/page";
import Planning from "./planning/page";
import Realization from "./realization/page";

const Dashboard = () => {
	return (
		<div>
			<Introduction />
			<LandUse />
			<Planning />
			<Realization />	
			<Conclusion />
		</div>
	);
};

export default Dashboard;
