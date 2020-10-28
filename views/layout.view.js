module.exports = function (props) {
	const {title, children} = props;
	return /*html*/`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
				<title>${title}</title>
				<script src="https://code.jquery.com/jquery.js"></script>
			</head>
			<body>
				${children}
			</body>
		</html>
	`;
}