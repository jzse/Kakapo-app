import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
import { Progress } from 'components/ui/';

function setup(props = {}) {
  return { props, wrapper: shallow(<Progress {...props} />) };
}

test('<Progress/> render', t => {
  t.plan(2);
  const { wrapper } = setup();
  t.equals(wrapper.type(), 'div');
  t.equals(wrapper.prop('className'), 'progress');
});

test('<Progress/> rounds 0.415 to 42% ', t => {
  t.plan(1);
  const { wrapper } = setup({ progress: 0.415 });
  t.equals(wrapper.find('.progress-text').text(), '42%');
});
