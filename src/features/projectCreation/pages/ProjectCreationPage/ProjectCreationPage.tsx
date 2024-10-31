import { memo, type FC } from 'react';

import { ProjectForm } from '../../components/ProjectForm';

const ProjectCreationPageComponent: FC = () => (
  <>
    <div>
      Create Project
    </div>
    <ProjectForm/>
  </>
);

/** Project creation page component. */
export const ProjectCreationPage = memo(ProjectCreationPageComponent);
