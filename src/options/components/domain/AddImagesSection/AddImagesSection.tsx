import { t } from '~/lib/i18n';
import { useIsEnabled } from '~/options/components/domain/hooks/useIsEnabled';
import { CheckCircle } from '~/options/components/shared/CheckCircle';

export const AddImagesSection: React.FC = () => {
  const addImagesLabel = t('addImagesToComments');
  const { isEnabled, toggle } = useIsEnabled('isAddImagesToCommentsEnabled');

  const sectionClassName = `config-container ${isEnabled ? 'active' : 'inactive'}`;

  return (
    <section className={sectionClassName}>
      <label className="config-title-container" onClick={toggle}>
        <CheckCircle isChecked={isEnabled} />
        {addImagesLabel}
      </label>
    </section>
  );
};
