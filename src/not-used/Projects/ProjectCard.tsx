import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Project as ProjectStore } from '../Project.store'


const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    marginTop: '10px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  }
}))

interface PrjectCardProps {
  project: ProjectStore
  clientId: string
}

const ProjectCard: React.FC<PrjectCardProps> = observer((props) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.project.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <i className="fas fa-map-marker-alt"></i> {props.project.address}, {props.project.city}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <i className="fas fa-sync-alt"></i> {props.project.isComplete ? "Completed" : "In progress"}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/admin/clients/${props.clientId}/projects/${props.project.id}`}>
            <Button size="small" color="primary" variant="outlined">
              Select
            </Button>
          </Link>
        </CardActions>
      </div>
    </Card>
  )
})

export default ProjectCard