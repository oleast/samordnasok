
import moment from 'moment'

String.prototype.getFormattedDate = function () {
  return moment(this.toString()).format('Do MMMM YYYY')
}