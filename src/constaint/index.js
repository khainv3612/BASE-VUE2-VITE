import i18n from '@/lang'

export const listTime = [
  {
    id: '',
    value: i18n.t('status.all')
  },
  {
    id: 1,
    value: i18n.t('times.two_weeks')
  },
  {
    id: 2,
    value: i18n.t('times.one_month')
  },
  {
    id: 3,
    value: i18n.t('times.three_month')
  },
  {
    id: 4,
    value: i18n.t('times.custom_time')
  }
]
export const listStatus = [
  {
    id: '',
    value: i18n.t('status.all')
  },
  {
    id: 1,
    value: i18n.t('status.save_draft')
  },
  {
    id: 2,
    value: i18n.t('status.posted')
  }
]
export const listSortStatus = [
  {
    id: 1,
    value: i18n.t('status.last_modified_date')
  },
  {
    id: 2,
    value: i18n.t('status.oldest_repair_date')
  },
  {
    id: 3,
    value: i18n.t('status.most_viewed')
  }
]

export const ID_TEAM_ACTIVE = 5
