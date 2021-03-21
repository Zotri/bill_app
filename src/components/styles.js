import { makeStyles } from "@material-ui/core/styles";
import { Brightness1Rounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		position: "relative",
		overflow: "auto",
		maxHeight: 300
	},
	listSection: {
		backgroundColor: "inherit"
	},
	ul: {
		backgroundColor: "inherit",
		padding: 0
	}
}));

export default useStyles;
