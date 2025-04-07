/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, type FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams, useNavigate } from 'react-router-dom';
import { TemplateService } from 'src/api/services/templateService';

import { TemplateForm } from '../../components/TemplateForm';

import styles from './ProcessTemplatePage.module.css';

const ProcessTemplatePageComponent: FC = () => {
  const { id } = useParams();
  const open = useSelector(selectIsDrawerOpen);
  const navigate = useNavigate();

  const [templateData, setTemplateData] = useState<any>(null);

  useEffect(() => {
    if (id == null) {
      navigate('/templates');
    } else {
      const fetchTemplateData = async() => {
        try {
          const data = await TemplateService.getTemplateJson(id);
          setTemplateData(data);
        } catch (error) {
          console.error('Error fetching template JSON:', error);
        }
      };

      fetchTemplateData();
    }
  }, [id, navigate]);

  if (!templateData) {
    return <div>Loading...</div>;
  }

  return (
    <main className={`${styles.layout} ${open ? styles.layoutOpen : ''}`}>
      <Container className={styles.container}>
        <Typography variant="h5" component="h5">
          Process Template
        </Typography>
        {/* Pass the templateData as a prop to TemplateForm */}
        <TemplateForm initialData={templateData} />
      </Container>
    </main>
  );
};

/** Template creation page component. */
export const ProcessTemplatePage = memo(ProcessTemplatePageComponent);
