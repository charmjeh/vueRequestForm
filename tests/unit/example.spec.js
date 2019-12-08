import {
  expect,
} from 'chai';
import {
  shallowMount,
} from '@vue/test-utils';
import inputData from '../../input';
import requestForm from '@/components/requestForm.vue';

describe('requestForm.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(requestForm, {
      propsData: {
        items: inputData.items,
      },
    });
    expect(wrapper.text()).to.include(inputData.items);
  });
});
