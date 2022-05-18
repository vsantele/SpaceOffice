import { Box, Link } from "@mui/material"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <Box
        sx={{
          mt: "2rem",
          mb: 0.4,
          color: (theme) => {
            return theme.palette.grey[600]
          },
        }}
      >
        Made with ❤️ by <Link href="https://www.linkedin.com/in/amaury-corbisier-70a146154/" underline="hover">Amaury Corbisier</Link>, <Link href="https://www.linkedin.com/in/damien-auversack-0188a0188/" underline="hover">Damien Auversack</Link>, <Link href="https://www.linkedin.com/in/simon-di-falco-2b108519b/" underline="hover">Simon Di falco</Link>, <Link href="https://www.linkedin.com/in/martin-maes-a45742211/" underline="hover">Martin Maes</Link>, <Link href="https://www.linkedin.com/in/will%C3%A8me-nathan-4a6133165/" underline="hover">Nathan Willème</Link> and <Link href="https://www.linkedin.com/in/victor-santele/" underline="hover">Victor Santelé</Link> for Space Office 2022.
      </Box>
    </footer>
  )
}
